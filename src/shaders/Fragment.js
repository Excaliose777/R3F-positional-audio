export const fragmentShader = /* glsl */ `
      uniform float time;
      uniform vec3 color;
      // uniform float audioLevel;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
        fresnel = pow(fresnel, 1.0); // Try a lower power like 1.0
        
        float pulse = 0.8 + 0.2 * sin(time * 2.0);
        
        vec3 finalColor = mix(color, color * fresnel, 0.5) * pulse; // Blend between base color and fresnel
        float alpha = fresnel * 0.7;

        gl_FragColor = vec4(finalColor, alpha);
      }
`;
