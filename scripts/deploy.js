let snftName = "creatorXsnft"
let snftSymbol = "ERC998"
let tierUpgradeCost1 = 500;
let childURI = "https://ERC1155.com/{id}";


async function main() {
    // We get the contract to deploy
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");

    const ComposableParentERC721 = await ethers.getContractFactory('ComposableParentERC721')
    parent = await ComposableParentERC721.deploy(
      snftName,
      snftSymbol,
      tierUpgradeCost1 )
    await parent.deployed()

    ComposableChildrenERC1155 = await ethers.getContractFactory('ComposableChildrenERC1155')
    child = await ComposableChildrenERC1155.deploy(childURI, parent.address)
    await child.deployed()
    ownerAddr = await parent.owner();

    console.log("Greeter deployed to:", greeter.address);
    console.log("Parent deployed to:", parent.address);
    console.log("Child deployed to:", child.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  