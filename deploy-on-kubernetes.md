# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

## Prerrequisitos

### 1. Instalar docker en la máquina 'Dev'

### 2. Crear las imagenes de la aplicación (build) y subirlas (push) a docker hub

En el directorio raiz del código descargado ejecutar:

      docker image build -t emontoya/artnode:1.0 .
      docker image push emontoya/artnode:1.0

### 3. Tener un usuario y Certificados de acceso (el profesor suministrará las claves y certificados), estos deben ser copiados en:

      certificados descargados en: proyecto#/ o donde lo haya hecho.

            $ mkdir $HOME/.kube
            $ cp -r proyecto#/* $HOME/.kube/

### 4. Instalar un cliente kubectl 

      https://kubernetes.io/docs/tasks/tools/install-kubectl/

      
Seguir las guias de instalación para cada sistema operativo, y luego:

En Linux:

      $ export KUBECONFIG=$HOME/.kube/kubeconfig


## Personalizar los manifiestos para cada grupo

Ir al directorio 'k8s/' y realizar el cambio de <namespace> por el usuario o proyecto especifico. Ej: 'emontoya', 'st0263', 'proyecto4'

Reemplazar en los manifiestos de Kubernetes en el directorio k8s/:

      <namespace> = grupo, ejemplo: emontoya
      <docker_hub_user> = usuario de Docker hub, ejemplo: emontoya
      <version> = versión de la imagen en Docker hub, ejemplo: 1.0

## Despliegue en cluster de Kubernetes

Para hacer el deploy a partir de los manifiestos, ejecutar desde el directorio raiz del código:

      kubectl -n emontoya create -f k8s/
      kubectl -n emontoya create configmap webapp-nginx-config --from-file=k8s/configmap/nginx.conf

## Limpiar la instalación

Para limpiar la instalación:

      kubectl -n emontoya delete rc --all
      kubectl -n emontoya delete deployment --all
      kubectl -n emontoya delete ingress --all
      kubectl -n emontoya delete configmap webapp-nginx-config
      kubectl -n emontoya delete service --all

/////

@20181            
