/* groovylint-disable-next-line CompileStatic */
node {
    def node = docker.image('node:14-alpine')
    // .inside {
    //             sh 'node --version'
    //         }
    stage('build image') {
        node.inside {
            sh 'node --version'
        // The app .war and Dockerfile are now available in the workspace. See below.
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
