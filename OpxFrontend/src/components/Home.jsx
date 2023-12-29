import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";

function Home() {
  const [coinData, setCoinData] = useState({
    'BTC-USDT': { coinName: 'Bilinmeyen Coin', price: 'Bilinmeyen Fiyat' },
    'LTC-USDT': { coinName: 'Bilinmeyen Coin', price: 'Bilinmeyen Fiyat' },
    'ETH-USDT': { coinName: 'Bilinmeyen Coin', price: 'Bilinmeyen Fiyat' },
    'DOGE-USDT': { coinName: 'Bilinmeyen Coin', price: 'Bilinmeyen Fiyat' },
    'SOL-USDT': { coinName: 'Bilinmeyen Coin', price: 'Bilinmeyen Fiyat' },
  });

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:51437/coinhub") 
      .configureLogging(signalR.LogLevel.Information)
      .build();
    
    connection.start().then(() => {
      console.log('SignalR Connected!');
    }).catch((err) => console.log('SignalR Connection Error: ', err));

    connection.on("ReceiveMessage", (message) => {
      const parsedData = JSON.parse(message);
      const coinName = parsedData?.arg?.instId;
      const price = parsedData?.data?.[0]?.asks?.[0]?.[0];

      // Farklı coinler için state'i güncelle
      setCoinData(prevData => ({
        ...prevData,
        [coinName]: { coinName, price }
      }));
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Merhaba!</h1>
      <p className="text-lg mb-8 text-gray-700">Uygulamanın ana sayfasına hoş geldiniz.</p>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(coinData).map((coin, index) => (
          <div key={index} className="shadow-md rounded-md p-6 bg-white">
            <h2 className="text-xl mb-4">{coin}</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left bg-gray-200">Coin Adı</th>
                  <th className="px-4 py-2 text-left bg-gray-200">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">{coinData[coin].coinName}</td>
                  <td className="border px-4 py-2">{coinData[coin].price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}  

export default Home;
