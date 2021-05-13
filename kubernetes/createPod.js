const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// This Can Probably Be Automated By Walking the Directories
const envs = [
    path.join(__dirname, '..', 'client', '.env'),
    path.join(__dirname, '..', 'client', 'server', '.env'),
    path.join(__dirname, '..', 'tendies', '.env'),
    path.join(__dirname, '..', 'shortner', '.env'),
    path.join(__dirname, '..', 'digits', '.env'),
    path.join(__dirname, '..', '.env'),
];

const envVars = new Map();

// Compile All Env Files
envs.forEach((envFile) => {
    const env = dotenv.parse(fs.readFileSync(envFile, 'utf8'));
    Object.entries(env).forEach(([key, value]) => {
        if (key === 'NODE_ENV') return;
        if (envVars.has(key) && envVars.get(key) !== value) {
            throw new Error(`Conflicting Environment Values for ${key}`);
        }
        envVars.set(key, value);
    });
});

const doc = yaml.loadAll(fs.readFileSync('snatcher-deployment.yaml', 'utf8'));

// Compile Deployment yaml
const prodOut = path.join(__dirname, 'prod-deploy.yaml');
const mysqlOut = path.join(__dirname, 'mysql-prod-deploy.yaml');
fs.writeFileSync(prodOut, '---\n');

doc.forEach((obj, it) => {
    if (it > 1) fs.appendFileSync(prodOut, '---\n');
    if (obj.kind === 'Deployment') {
        obj.spec.template.spec.containers.forEach((container) => {
            if (container.env) {
                container.env.forEach((env) => {
                    if (env.value === 'REPLACE') {
                        if (!envVars.has(env.name)) {
                            throw new Error(
                                `Required Environment Variable ${env.name} Not Found`
                            );
                        }
                        // eslint-disable-next-line no-param-reassign
                        env.value = envVars.get(env.name);
                    }
                });
            }
        });
    }
    fs.appendFileSync(prodOut, yaml.dump(obj));
    return true;
});

// Compile MySQL yaml
const mysql = yaml.loadAll(fs.readFileSync('mysql-deployment.yaml', 'utf8'));

if (!envVars.has('MYSQL_PROD_PASSWORD')) {
    throw new Error(
        'Required Environment Variable MYSQL_PROD_PASSWORD Not Found'
    );
}

mysql[1].spec.template.spec.containers[0].env[0].value = envVars.get(
    'MYSQL_PROD_PASSWORD'
);

fs.writeFileSync(mysqlOut, '---\n');

mysql.forEach((obj, it) => {
    if (it > 1) fs.appendFileSync(mysqlOut, '---\n');
    fs.appendFileSync(mysqlOut, yaml.dump(obj));
});
