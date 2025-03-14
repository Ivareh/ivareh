import argparse
import os
from time import sleep

from PIL import Image, ImageOps
import exifread

from azure.core.exceptions import ResourceExistsError
from azure.storage.blob import BlobServiceClient, ContainerClient


OBJ_IGNORE_LIST = set([".gitkeep"])
AZURITE_SERVER = os.getenv("AZURITE_SERVER")
AZURITE_ACCOUNT_KEY = os.getenv("AZURITE_ACCOUNT_KEY")


def get_correct_dimensions(img):
    """
    Returns (width, height) adjusted for EXIF orientation.
    """
    width, height = img.width, img.height

    try:
        # Check EXIF orientation tag (if it exists)
        exif = img.getexif()
        orientation = exif.get(274)  # 274 is the EXIF tag for orientation

        # Swap dimensions for orientations that require 90/270 degree rotation
        if orientation in [6, 8]:
            width, height = height, width

    except Exception as e:
        print(f"Error reading EXIF: {e}")

    return width, height


def upload_file(container_client: ContainerClient, source: str, dest: str) -> None:
    print(f"Uploading {source} to {dest}")
    metadata = {}

    with open(source, "rb") as file:
        # Read image with Pillow and auto-rotate based on EXIF
        img = Image.open(file)
        img = ImageOps.exif_transpose(img)  # Auto-rotate image if needed

        # Get corrected dimensions
        width, height = get_correct_dimensions(img)
        metadata["width"] = str(width)
        metadata["height"] = str(height)

        # Reset file pointer for EXIF reading
        file.seek(0)
        tags = exifread.process_file(file, details=False)
        datetime_original = tags.get("EXIF DateTimeOriginal")
        if datetime_original:
            metadata["captured_time"] = str(datetime_original)

    # Upload the blob with metadata
    with open(source, "rb") as data:
        try:
            container_client.upload_blob(
                name=dest, data=data, metadata=metadata, overwrite=True
            )
        except ResourceExistsError:
            pass


def upload_dir(container_client: ContainerClient, source: str, dest: str) -> None:
    """
    Upload a directory to a path inside the container.
    """
    prefix = "" if dest == "" else dest + "/"
    prefix += os.path.basename(source) + "/"
    for root, dirs, files in os.walk(source):
        for name in files:
            if name in OBJ_IGNORE_LIST:
                continue
            dir_part = os.path.relpath(root, source)
            dir_part = "" if dir_part == "." else dir_part + "/"
            file_path = os.path.join(root, name)
            blob_path = prefix + dir_part + name
            upload_file(container_client, file_path, blob_path)


def init_containers(
    service_client: BlobServiceClient, containers_directory: str
) -> None:
    """
    Iterate on the containers directory and do the following:
    1- create the container.
    2- upload all folders and files to the container.
    """
    for container_name in os.listdir(containers_directory):
        container_path = os.path.join(containers_directory, container_name)
        if os.path.isdir(container_path):
            container_client = service_client.get_container_client(container_name)
            try:
                container_client.create_container()
            except ResourceExistsError:
                pass
            for blob in os.listdir(container_path):
                blob_path = os.path.join(container_path, blob)
                if os.path.isdir(blob_path):
                    upload_dir(container_client, blob_path, "")
                else:
                    upload_file(container_client, blob_path, blob)


if __name__ == "__main__":
    print("Starting initialize azurite blob storage")
    parser = argparse.ArgumentParser(
        description="Initialize azurite emulator containers."
    )
    parser.add_argument(
        "--directory",
        required=True,
        help="""
        Directory that contains subdirectories named after the
        containers that we should create. Each subdirectory will contain the files
         and directories of its container.
        """,
    )

    args = parser.parse_args()

    print("Parsed arguments for azurite emulate containers")

    # Connect to the localhost emulator (after 5 secs to make sure it's up).
    print("Waiting for localhost emulator connection 5 secs...")
    sleep(5)
    port = ":10000" if AZURITE_SERVER == "localhost" else ""
    blob_service_client = BlobServiceClient(
        account_url="http://localhost:10000/devstoreaccount1",
        credential={
            "account_name": "devstoreaccount1",
            "account_key": AZURITE_ACCOUNT_KEY,  # type: ignore
        },
    )
    print("Finished waiting and initialized Blob Service Client")

    # Only initialize if not already initialized.
    if next(blob_service_client.list_containers(), None):
        print("Emulator already has containers, will skip initialization.")
    else:
        print("Initializing containers...")
        init_containers(blob_service_client, args.directory)
        print("Finished initializing containers")
