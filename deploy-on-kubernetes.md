# NodeJS articulosEM

By: Edwin Montoya Munera - emontoya@eafit.edu.co

## Prerrequisitos

### 1. Instalar docker en la máquina 'Dev'

### 2. Crear las imagenes de la aplicación (build) y subirlas (push) a docker hub

En el directorio raiz del código descargado ejecutar:

      docker image build -t <docker_hub_user>/artnode:<version> .
      docker image push <docker_hub_user>/artnode:<version>

Reemplazar en los manifiestos de Kubernetes en el directorio k8s:

      <namespace> = grupo ej proyecto1
      <docker_hub_user> = usuario de Docker hub
      <version> = versión de la imagen en Docker hub

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

Ir al directorio 'k8s' y realizar el cambio de <namespace> por el usuario o proyecto especifico. Ej: 'emontoya', 'st0263', 'proyecto4'

## Despliegue en cluster de Kubernetes

Para hacer el deploy a partir de los manifiestos, ejecutar desde el directorio raiz del código:

      $ kubectl -n <namaspace> create -f k8s/
      $ kubectl -n <namespace> create configmap webapp-nginx-config --from-file=k8s/configmap/nginx.conf


## Limpiar la instalación

Para limpiar la instalación:

      $ kubectl -n <namespace> delete rc --all
      $ kubectl -n <namespace> delete deployment --all
      $ kubectl -n <namespace> delete ingress --all
      $ kubectl -n <namespace> delete configmap webapp-nginx-config
      $ kubectl -n <namespace> delete service --all

/////

@20181            
