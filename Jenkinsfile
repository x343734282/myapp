/* groovylint-disable-next-line CompileStatic */
node('default'){
            checkout scm
            stage('SonarQube') {
                    def scannerHome = tool 'sonar';
                    withSonarQubeEnv('sonarQube') { // If you have configured more than one global server connection, you can specify its name
                                sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
                    }
                 }
                 stage("Quality Gate") {
                    steps {
                        timeout(time: 1, unit: 'HOURS') {
                            // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                            // true = set pipeline to UNSTABLE, false = don't
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
}
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
