ARG ELASTIC_VERSION

# https://www.docker.elastic.co/
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELASTIC_VERSION}
RUN bin/elasticsearch-plugin install --batch analysis-nori
# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu
