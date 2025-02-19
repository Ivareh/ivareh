#!/bin/sh
set -e

# Run initialization
python init_azurite.py --directory=init_containers

# Start Azurite blob service (replace with the correct command if needed)
exec azurite-blob --blobHost 0.0.0.0 --blobPort 10000
