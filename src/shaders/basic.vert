#version 300 es

precision highp float;

layout(location = 0) in vec3 aPos; // vertext position
layout(location = 1) in vec3 aColor; // vertex color

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uColorMultiplier;

out vec3 vColor; // colors passed to fragment shader

void main() {
    vColor = aColor * uColorMultiplier;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPos, 1.0);
}
