async function main() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await HelloWorld.attach('0x6db6da1256AeD3b5e41c9D1CfAb586013cfdd863')
    
    console.log("Current message:", await helloWorldContract.message())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

