FROM openjdk:7

EXPOSE 8080

COPY . /usr/src/myapp

WORKDIR /usr/src/myapp

RUN javac -sourcepath pas/ -cp "/pas/jar/mysql-connector-java-8.0.19.jar" pas/*.java

CMD ["java", "pas/Backend"]