const vertexShaderSource = `#version 300 es
in vec3 aPos;
uniform mat4 uProj;
uniform mat4 uView;
void main(){
gl_Position = uProj * uView * vec4(aPos,1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;
void main(){
outColor = vec4(0.2,0.8,1.0,1.0);
}
`;