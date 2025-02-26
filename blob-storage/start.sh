#!/bin/sh
set -e  # Exit immediately on error

# Start the Azurite blob emulator with development-friendly options.
azurite-blob --blobHost 0.0.0.0 --blobPort 10000 --loose --skipApiVersionCheck &
AZURITE_PID=$!
echo "Azurite started with PID $AZURITE_PID"

# Optionally, wait until Azurite is ready
echo "Waiting for Azurite to be ready..."
for i in $(seq 1 10); do
  if nc -z 0.0.0.0 10000; then
    echo "Azurite is up!"
    break
  fi
  sleep 1
done

# Run the initialization scripts
echo "Running initialization scripts..."
python3 init_azurite.py --directory=init_containers
python3 load_data.py --directory=init_containers

# Keep the container running by waiting on Azurite
wait $AZURITE_PID
