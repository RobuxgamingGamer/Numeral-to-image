const vertexShaderSource = `#version 300 es
precision highp float;

in vec3 aPosition;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

void main(){
gl_Position = uProjection * uView * uModel * vec4(aPosition,1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float uAlpha;
uniform bool uGlossy;

out vec4 outColor;

void main(){

vec3 baseColor = vec3(0.2,0.8,1.0);

if(uGlossy){
float light = dot(normalize(vec3(0.5,1.0,0.3)), vec3(0.0,0.0,1.0));
baseColor += light * 0.3;
}

outColor = vec4(baseColor, uAlpha);
}
`;