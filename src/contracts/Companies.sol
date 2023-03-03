pragma solidity ^0.5.0;

contract Companies {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

   struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );
    constructor() public{
        name = "abc company";
    }

  function createProduct(string memory _name, uint _price) public {
      // Require a valid name
    require(bytes(_name).length > 0);
    // Require a valid price
    require(_price > 0);
    productCount ++;
    products[productCount] = Product(productCount, _name, _price,msg.sender,false);
    emit ProductCreated(productCount, _name, _price,msg.sender,false);
  }

  function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
         require(_product.id > 0 && _product.id <= productCount);
    // Require that there is enough Ether in the transaction
    require(msg.value >= _product.price);
    // Require that the product has not been purchased already
    require(!_product.purchased);
    // Require that the buyer is not the seller
    require(_seller != msg.sender);
        _product.owner = msg.sender;
        _product.purchased = true;
        products[_id] = _product;
        address(_seller).transfer(msg.value);
        emit ProductPurchased(productCount, _product.name, _product.price,msg.sender,true);

    }
}