kubectl patch svc ingress-nginx-controller -n ingress-nginx -p "{\"metadata\":{\"labels\":{\"service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol\":\"true\"}}}"

kubectl patch svc ingress-nginx-controller -n ingress-nginx -p "{\"metadata\":{\"annotations\":{\"service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol\":\"true\"}}}"

kubectl edit configmap ingress-nginx-controller -n ingress-nginx # Manually Update Values for Proxy in Config

# kubectl logs -n cert-manager cert-manager-7dd5854bb4-vfzxm