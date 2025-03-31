#version 300 es

layout(location = 0) in vec3 aPos; // vertext position
layout(location = 1) in vec3 aColor; // vertex color

out vec3 vColor; // colors passed to fragment shader
uniform vec3 uColorMultiplier;
uniform mat4 uModelMatrix;

void main() {
    gl_Position = uModelMatrix * vec4(aPos, 1.0);
    vColor = aColor * uColorMultiplier;
}
