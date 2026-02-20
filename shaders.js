// ===== SHADERS =====

const vertexShaderSource = `#version 300 es
precision highp float;

in vec3 aPosition;
in vec3 aNormal;
in vec3 aColor;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

out vec3 vNormal;
out vec3 vColor;
out vec3 vFragPos;

void main(){
vec4 worldPos = uModel * vec4(aPosition,1.0);
vFragPos = worldPos.xyz;
vNormal = mat3(uModel) * aNormal;
vColor = aColor;

gl_Position = uProjection * uView * worldPos;
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

in vec3 vNormal;
in vec3 vColor;
in vec3 vFragPos;

uniform vec3 uLightPos;
uniform float uTransparency;
uniform bool uGlossy;

out vec4 outColor;

void main(){

vec3 norm = normalize(vNormal);
vec3 lightDir = normalize(uLightPos - vFragPos);

float diff = max(dot(norm, lightDir), 0.0);

vec3 viewDir = normalize(-vFragPos);
vec3 reflectDir = reflect(-lightDir, norm);

float spec = 0.0;
if(uGlossy){
spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
}

vec3 ambient = 0.2 * vColor;
vec3 diffuse = diff * vColor;
vec3 specular = spec * vec3(1.0);

vec3 result = ambient + diffuse + specular;

outColor = vec4(result, uTransparency);
}
`;