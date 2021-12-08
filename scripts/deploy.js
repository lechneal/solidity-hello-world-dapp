async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await HelloWorld.deploy("Hello World!");

    console.log("HelloWorld address:", helloWorldContract.address);
    saveDAppFiles(helloWorldContract);
}

function saveDAppFiles(contract) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    const addressFileName = contractsDir + "/helloworld-address.json";
    fs.writeFileSync(
        addressFileName,
        JSON.stringify({ Contract: contract.address }, undefined, 2)
    );
    console.log("Stored address in ", addressFileName);

    const ContractArtifact = artifacts.readArtifactSync("HelloWorld");
    const artifactFileName = contractsDir + "/HelloWorld.json";
    fs.writeFileSync(
        artifactFileName,
        JSON.stringify(ContractArtifact, null, 2)
    );
    console.log("Stored artifact in ", artifactFileName);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

