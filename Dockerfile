FROM jenkins/jenkins:lts
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN rm -rf /usr/share/jenkins/ref/plugins/github-branch-source.lock
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt
EXPOSE 8080