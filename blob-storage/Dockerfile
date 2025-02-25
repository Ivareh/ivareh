ARG AZURITE_VERSION="3.33.0"
FROM mcr.microsoft.com/azure-storage/azurite:${AZURITE_VERSION}

# Install azure-storage-blob python package and dependencies
RUN apk update && \
    apk --no-cache add py3-pip && \
    apk add --virtual=build gcc libffi-dev musl-dev python3-dev && \
    pip3 install --upgrade pip && \
    pip3 install azure-storage-blob==12.12.0

# Copy initialization scripts and container data
COPY ./init_azurite.py init_azurite.py
COPY ./load_data.py load_data.py
COPY ./init_containers init_containers

# Copy and set up the startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Use the startup script as the container entrypoint
CMD ["/start.sh"]
