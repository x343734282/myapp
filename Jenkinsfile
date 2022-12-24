/* groovylint-disable-next-line CompileStatic */
node('docker-agent') {
    checkout scm
        docker.withServer('tcp://192.168.1.254:2375') {
            def node = docker.image('node:14-alpine')
            stage('build image') {
                node.inside {
                    sh 'node --version'
                // The app .war and Dockerfile are now available in the workspace. See below.
                }
            }
        }

            // stage('install') {
            //     steps {
            //     // sh 'npm install'
            //     }
            // }

            // stage('run') {
            //     steps {
            //     // sh 'npm run start'
            //     }
            // }

// stage('end') {
//     steps {
//     // echo  'running...'
//     }
// }
}
