from datetime import datetime

from requests import Response, post, HTTPError
import argparse
import os

from azure.storage.blob import BlobServiceClient, BlobProperties
from azure.core.paging import ItemPaged

DOMAIN = os.getenv("DOMAIN")
AZURITE_ACCOUNT_KEY = os.getenv("AZURITE_ACCOUNT_KEY")
AZURITE_SERVER = os.getenv("AZURITE_SERVER")


def send_data(api_url: str, json_data: list[dict[str, str]]) -> Response | None:
    try:
        response = post(api_url, json=json_data)
        response.raise_for_status()  # Raises an exception for 4xx/5xx errors
        return response
    except HTTPError as e:
        if e.response.status_code == 409:
            print("Some or all objects already inserted into database")
        else:
            raise HTTPError(
                f"Failed to send data to {api_url}: {e} \n detail: \n {response.content[0:200]}..."  # type: ignore
            ) from e
    except Exception as e:
        raise HTTPError(f"Failed to send data: {e}") from e


def create_api_objects(
    blob_list: ItemPaged[BlobProperties], container_name: str, account_url: str
) -> list[dict[str, str]]:
    data_l = []
    for blob in blob_list:
        metadata = blob.metadata or {}
        if not metadata:
            raise Exception(f"No metadata found for blob {blob.name}")
        formatted_cap_time = datetime.strptime(
            metadata.get("captured_time"), "%Y:%m:%d %H:%M:%S"
        )
        img_type, _, title = blob.name.partition("/")
        url = f"{account_url}/{container_name}/{blob.name}"
        obj = {
            "title": title,
            "category": img_type,
            "url": url,
            "width": metadata.get("width"),
            "height": metadata.get("height"),
            "captured_time": formatted_cap_time.isoformat(),
        }
        data_l.append(obj)
    return data_l


if __name__ == "__main__":
    try:
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
        containers_directory = args.directory

        blob_service_client = BlobServiceClient(
            account_url="http://localhost:10000/devstoreaccount1",
            credential={
                "account_name": "devstoreaccount1",
                "account_key": AZURITE_ACCOUNT_KEY,  # type: ignore
            },
        )

        api_url = "http://backend:8000/api/v1/upsert_multi_images"
        save_api_host = (
            "localhost:10000"
            if AZURITE_SERVER == "localhost"
            else f"{AZURITE_SERVER}.{DOMAIN}"
        )
        save_api_url = f"http://{save_api_host}/devstoreaccount1"

        print("Creating and sending API objects")
        for container_name in os.listdir(containers_directory):
            container_path = os.path.join(containers_directory, container_name)

            for container_name in os.listdir(containers_directory):
                blob_list = blob_service_client.get_container_client(
                    container_name
                ).list_blobs(include=["metadata"])
                data = create_api_objects(blob_list, container_name, save_api_url)
                send_data(api_url=api_url, json_data=data)
        print("Finished creating and sending API objects")
    except Exception as ex:
        print("Exception:")
        print(ex)
