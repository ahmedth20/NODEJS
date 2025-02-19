pipeline {
    agent any

    tools {
        jdk 'JAVA_HOME'
        maven 'M2_HOME'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    try {
                        git branch: 'master', url: 'https://github.com/hwafa/timesheetproject.git'
                    } catch (Exception e) {
                        echo "Error during Git checkout: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline due to Git checkout failure."
                    }
                }
            }
        }

        stage('Compile Stage') {
            steps {
                script {
                    try {
                        if (isUnix()) {
                            sh 'mvn clean compile'
                        } else {
                            bat 'mvn clean compile'
                        }
                    } catch (Exception e) {
                        echo "Compilation error: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Stopping pipeline due to compilation failure."
                    }
                }
            }
        }
    }
}
