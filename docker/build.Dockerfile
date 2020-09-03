ARG BASE_IMAGE
FROM $BASE_IMAGE AS builder

RUN node-prune

FROM mhart/alpine-node:14

RUN apk add python make build-base libexecinfo-dev libpng-dev bash curl libtool lcms2-dev autoconf automake musl-dev nasm git

WORKDIR /fly

COPY --from=builder /src /fly
