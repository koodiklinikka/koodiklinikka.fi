import nextConfig from 'eslint-config-next/core-web-vitals';

const eslintConfig = [...nextConfig, { ignores: ['out'] }];

export default eslintConfig;
