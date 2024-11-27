import { ethers } from "ethers";
import * as XLSX from "xlsx";
import fs from "fs";

// 用于存储钱包数据的数组
const walletData = [];

// 循环生成 50 个钱包
for (let i = 0; i < 50; i++) {
  const wallet = ethers.Wallet.createRandom();
  walletData.push({
    Mnemonic: wallet.mnemonic.phrase,
    Address: wallet.address,
    PrivateKey: wallet.privateKey
  });
}

// 创建一个工作簿（Workbook）
const wb = XLSX.utils.book_new();

// 将数据转换为工作表（Worksheet）
const ws = XLSX.utils.json_to_sheet(walletData);

// 将工作表添加到工作簿
XLSX.utils.book_append_sheet(wb, ws, "Wallets");

// 指定保存文件的路径
const filePath = "wallets_50_data.xlsx";

// 将工作簿写入到 Excel 文件
XLSX.writeFile(wb, filePath);

console.log(`50 个钱包的信息已保存到 ${filePath}`);