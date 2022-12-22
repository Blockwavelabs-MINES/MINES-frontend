// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract ReserveTransfer {
    event RunTransfer(address sender, address receiver, uint256 amount);
    event CreateTransfer(
        address sender,
        address receiver,
        IERC20 token,
        uint256 amount,
        uint expireTime
    );
    event AddAmount(uint256 id, uint256 amount);
    event CompleteTransfer(
        uint256 id,
        address sender,
        address receiver,
        uint256 amount
    );

    address public owner;
    uint256 public feePercent; // 5 = 0.005 %
    uint256 public count;

    mapping(address => uint256[]) private ownedTransfer;
    mapping(uint256 => Transfer) private transfers;

    modifier isValidID(uint256 _id) {
        require(
            transfers[_id].sender != address(0),
            "This transfer is already complete or not exist"
        );
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not Owner");
        _;
    }

    struct Transfer {
        address sender;
        IERC20 token;
        uint256 amount;
        uint256 expiredTime;
    }

    constructor(uint256 _fee) {
        owner = msg.sender;
        feePercent = _fee;
        console.log("Deployed");
    }

    // Action Functions =========================================================
    // ETH > 송금 등록
    // 받는 사람 미정 시 - 컨트렉트가 임시로 권한 획득
    // => 언이니셜라이즈 상태로 설정
    // 데드라인 미정 시  - 제한기간이 없음
    function makeTransferETH(
        address _receiver,
        uint256 _deadline
    ) external payable {
        // 받는 사람 지정, 데드라인 0 => 즉시 송금
        if (_receiver != address(0)) {
            payETH(msg.sender, _receiver, msg.value);
            return;
        } else {
            uint256 expireTime = _deadline != 0
            ? block.timestamp + _deadline
            : 0;

            ownedTransfer[msg.sender].push(count);

            transfers[count++] = Transfer(
                msg.sender,
                IERC20(address(0)),
                msg.value,
                expireTime
            );

            emit CreateTransfer(
                msg.sender,
                _receiver,
                IERC20(address(0)),
                msg.value,
                expireTime
            );
        }
    }

    function makeTransfer(
        IERC20 _token,
        uint256 _amount,
        address _receiver,
        uint256 _deadline
    ) external {
        // 받는 사람 지정, 데드라인 0 => 즉시 송금
        if (_receiver != address(0)) {
            _token.transferFrom(msg.sender, _receiver, _amount);
            return;
        } else {
            uint256 expireTime = _deadline != 0
            ? block.timestamp + _deadline
            : 0;

            _token.transferFrom(msg.sender, address(this), _amount);

            ownedTransfer[msg.sender].push(count);

            transfers[count++] = Transfer(
                msg.sender,
                _token,
                _amount,
                expireTime
            );

            emit CreateTransfer(
                msg.sender,
                _receiver,
                _token,
                _amount,
                expireTime
            );
        }
    }

    function addAmountETH(uint256 _id) external payable isValidID(_id) {
        Transfer storage transfer = transfers[_id];
        isSender(transfer.sender);

        transfer.amount += msg.value;

        emit AddAmount(_id, msg.value);
    }

    function addAmount(
        uint256 _id,
        uint256 _amount
    ) external payable isValidID(_id) {
        Transfer storage transfer = transfers[_id];
        isSender(transfer.sender);

        transfer.token.transferFrom(msg.sender, address(this), _amount);
        transfer.amount += _amount;

        emit AddAmount(_id, msg.value);
    }

    function setReceiverETH(
        uint256 _id,
        address _receiver
    ) external isValidID(_id) {
        require(_receiver != address(0), "Not be zero");
        Transfer memory transfer = transfers[_id];
        isSender(transfer.sender);

        if (
            !(transfer.expiredTime == 0 ||
        transfer.expiredTime > block.timestamp)
        ) {
            refundETH(transfer.sender, transfer.amount);
        } else {
            payETH(transfer.sender, _receiver, transfer.amount);
        }

        delete transfers[_id];
    }

    function setReceiver(
        uint256 _id,
        address _receiver
    ) external isValidID(_id) {
        require(_receiver != address(0), "Not be zero");
        Transfer memory transfer = transfers[_id];
        isSender(transfer.sender);

        if (
            !(transfer.expiredTime == 0 ||
        transfer.expiredTime > block.timestamp)
        ) {
            refundToken(transfer.sender, transfer.token, transfer.amount);
        } else {
            payToken(transfer.sender, _receiver, transfer.token, transfer.amount);
        }

        delete transfers[_id];
    }

    function cancelTransferETH(uint256 _id) external isValidID(_id) {
        Transfer memory transfer = transfers[_id];
        isSender(transfer.sender);

        refundETH(transfer.sender, transfer.amount);

        delete transfers[_id];
    }

    function cancelTransfer(uint256 _id) external isValidID(_id) {
        Transfer memory transfer = transfers[_id];
        isSender(transfer.sender);

        refundToken(transfer.sender, transfer.token, transfer.amount);

        delete transfers[_id];
    }

    // Internal Functions  =====================================================
    function payETH(
        address _sender,
        address _receiver,
        uint256 _amount
    ) internal returns (uint amount) {
        amount = payFeeETH(_amount);
        payable(_receiver).transfer(amount);

        emit RunTransfer(_sender, _receiver, amount);
    }

    function payFeeETH(uint256 _amount) internal returns (uint feeAmount) {
        feeAmount = (_amount * feePercent) / 100000;
        payable(owner).transfer(feeAmount);

        return feeAmount;
    }

    function payToken(
        address _sender,
        address _receiver,
        IERC20 _token,
        uint256 _amount
    ) internal returns (uint amount) {
        amount = payFeeToken(_token, _amount);
        _token.transfer(_sender, amount);

        emit RunTransfer(_sender, _receiver, amount);
    }

    function payFeeToken(
        IERC20 _token,
        uint256 _amount
    ) internal returns (uint feeAmount) {
        feeAmount = (_amount * feePercent) / 100000;
        _token.transfer(owner, feeAmount);

        return feeAmount;
    }

    function refundETH(address _sender, uint256 _amount) internal {
        payable(_sender).transfer(_amount);
    }

    function refundToken(
        address _sender,
        IERC20 _token,
        uint256 _amount
    ) internal {
        _token.transfer(_sender, _amount);
    }

    // Check Functions ====================================================
    function isSender(address _sender) internal view {
        require(msg.sender == _sender, "Not Sender");
    }

    function isExpired(uint256 _time) internal view {
        if (!(_time == 0 || block.timestamp < _time)) {
            revert("Expired");
        }
    }

    // View Functions =====================================================
    function checkStatus(
        uint256 _id
    ) external view isValidID(_id) returns (uint256) {
        Transfer memory transfer = transfers[_id];
        if (transfer.sender == address(0)) {
            return 2;
        } else if (
            transfer.expiredTime == 0 || transfer.expiredTime > block.timestamp
        ) {
            return 0;
        } else {
            return 1;
        }
    }

    function getTransferInfo(
        uint256 _id
    ) external view isValidID(_id) returns (Transfer memory) {
        return transfers[_id];
    }

    function getTransferIDs(
        address _user
    ) external view returns (uint256[] memory) {
        return ownedTransfer[_user];
    }
}
