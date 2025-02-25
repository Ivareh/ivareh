#!/bin/sh
# Start the azurite blob emulator in the background
azurite-blob --blobHost 0.0.0.0 --blobPort 10000 &
AZURITE_PID=$!

# Give azurite a few seconds to start up (adjust if needed)
sleep 5

# Run the initialization scripts
python3 init_azurite.py --directory=init_containers
python3 load_data.py --directory=init_containers

# Wait on the azurite process to keep the container running
wait $AZURITE_PID
