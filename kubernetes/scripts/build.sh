cd ../../

docker build -t snatcher-gateway .

cd shortner

docker build -t snatcher-shortner .

cd ../tendies

docker build -t snatcher-tendies .

cd ../digits

docker build -t snatcher-digits .

cd ../client

docker build -t snatcher-client .

doctl registry login

docker tag snatcher-gateway registry.digitalocean.com/snatcher/snatcher-gateway

docker tag snatcher-tendies registry.digitalocean.com/snatcher/snatcher-tendies

docker tag snatcher-shortner registry.digitalocean.com/snatcher/snatcher-shortner

docker tag snatcher-digits registry.digitalocean.com/snatcher/snatcher-digits

docker tag snatcher-client registry.digitalocean.com/snatcher/snatcher-client

docker push registry.digitalocean.com/snatcher/snatcher-gateway

docker push registry.digitalocean.com/snatcher/snatcher-tendies

docker push registry.digitalocean.com/snatcher/snatcher-shortner

docker push registry.digitalocean.com/snatcher/snatcher-digits

docker push registry.digitalocean.com/snatcher/snatcher-client