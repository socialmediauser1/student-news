# ---- Stage 1: build the JAR (JDK + Maven, thrown away afterwards) ----
FROM maven:3.10-eclipse-temurin-27 AS build
WORKDIR /app
# Dependencies first, in their own layer: only rebuilt when pom.xml changes.
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
# Source code second, so a Java change reuses the dependency layer above.
COPY src ./src
RUN mvn -B -q package -DskipTests

# ---- Stage 2: run the JAR (JRE only, on Alpine) ----
FROM eclipse-temurin:27-jre-alpine
WORKDIR /app
# Unprivileged user with a fixed numeric id.
RUN addgroup -S -g 10001 app && adduser -S -u 10001 -G app app
# The upload directory, owned by that user so the service can write to it.
RUN mkdir -p /data/avatars && chown app:app /data/avatars
COPY --from=build /app/target/avatar-service.jar app.jar
USER 10001:10001
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
