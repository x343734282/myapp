/* groovylint-disable-next-line CompileStatic */
node {
    // git '/tmp/'
    checkout scm
    docker.withTool('docker-agent') {
        docker.withServer('tcp://192.168.1.254:2375') {
        // docker.image('httpd').withRun('-p 8080:80') { c ->
        //     sh "curl -i http://${hostIp(c)}:8080/"
        // }

            def node = docker.image('node:14-alpine')
            stage('build image') {
                node.withRun('-p 3306:3306') {
                    sh 'node --version'
                // The app .war and Dockerfile are now available in the workspace. See below.
                }
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
