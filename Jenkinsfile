/* groovylint-disable-next-line CompileStatic */
node('docker-agent') {
    checkout scm
        docker.withServer('tcp://192.168.1.254:2375') {
                // def node = docker.image('node:14-alpine')
                // stage('build image') {
                //     node.inside {
                //         sh 'node --version'
                //     // The app .war and Dockerfile are now available in the workspace. See below.
                //     }
                // }
                // def customImage = docker.build("my-image:${env.BUILD_ID}")
                def image
                stage('build') {
                    image = docker.build('myapp')
                    echo "image id is ${image.id}"
                }

                docker.withRegistry('http://192.168.1.254:5000/v2') {
                    stage('push') {
                        image.push("${env.BUILD_ID}")
                    }

                    stage('clear') {
                        sh "docker image rm ${image.id} -f"
                        sh "docker image rm 192.168.1.254:5000/${image.id}:${env.BUILD_ID} -f"
                    }
                }
        }
}
