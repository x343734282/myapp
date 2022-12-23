/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

        stages {
            stage('build image') {
                docker.image('node:14-alpine').inside {
                    sh 'node --version'
                }
            }

            stage('install') {
                steps {
                // sh 'npm install'
                }
            }

            stage('run') {
                steps {
                // sh 'npm run start'
                }
            }

            stage('end') {
                steps {
                // echo  'running...'
                }
            }
        }
}
