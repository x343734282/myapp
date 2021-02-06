pipeline {
    agent {
        docker { image 'node' }
    }
    stages {
        stage('verify') {
            steps {
                sh 'node --version'
            }
        }
		
		stage('install') {
            steps {
                sh 'npm install'
            }
        }
		
		stage('run') {
            steps {
                sh 'npm run start'
            }
        }
		
		stage('end') {
            steps {
                echo  'running...'
            }
        }
    }
}