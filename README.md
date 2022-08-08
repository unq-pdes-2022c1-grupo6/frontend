# Sistema para la asignación de cupos - Frontend
![UNQUE](https://github.com/unq-pdes-2022c1-grupo6/frontend/actions/workflows/docker-image.yml/badge.svg)
![code grade](https://api.codiga.io/project/32833/status/svg)
![code quality score](https://api.codiga.io/project/32833/score/svg)


Repositorio del proyecto de la materia Prácticas del Desarrollo de Software de la Universidad Nacional de Quilmes para el primer cuatrimestre de 2022.

## Integrantes
[Lisa Romero](https://github.com/lisar01)

## Enunciado
https://docs.google.com/document/d/14fxcGm_xJCpQPeT6OD43XqEgDk64DZe2cSJG_VLuOOU/edit

## Tareas del proyecto
https://github.com/unq-pdes-2022c1-grupo6/frontend/projects/1

## Instalación
```
# login to ghcr.io with Github User & Personal Access Token
echo GH_PAT | docker login ghcr.io -u GH_USER --password-stdin

# pull image after successful login
docker pull ghcr.io/unq-pdes-2022c1-grupo6/frontend:main

# run container
docker run -p 3000:3000 ghcr.io/unq-pdes-2022c1-grupo6/frontend:main
```

## Wiki del proyecto
https://github.com/unq-pdes-2022c1-grupo6/frontend/wiki
