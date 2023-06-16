const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: [
      '自分・自分に対しての意識',
      'お金・物資的豊かさ',
      'スキル・知識習得',
      '家族など大切な存在',
      '趣味・娯楽',
      '社交・人間関係',
      '仕事・社会的地位',
      '健康'
    ],
    datasets: [
      {
        label: '現在の状態',
        backgroundColor: 'rgb(0, 200, 132, 0.1)',
        borderColor: 'rgb(0, 200, 132)',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderWidth: 1
      },
      {
        label: 'こうありたい状態',
        backgroundColor: 'rgb(0, 0, 132, 0.1)',
        borderColor: 'rgb(0, 0, 132)',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    }
  }
});

document.getElementById('realitySave').addEventListener('click', function() {
  const realityData = [
    document.getElementById('realitySelfInput').value,
    document.getElementById('realityMoneyInput').value,
    document.getElementById('realityKnowledgeInput').value,
    document.getElementById('realityFamilyInput').value,
    document.getElementById('realityHobbyInput').value,
    document.getElementById('realitySocialInput').value,
    document.getElementById('realityWorkInput').value,
    document.getElementById('realityHealthInput').value
  ];

  chart.data.datasets[0].data = realityData.map(Number);
  chart.update();

  // データを保存する
  const dataToSave = {
    firstdata: realityData.map(Number),
    seconddata: chart.data.datasets[1].data
  };

  saveDataToLocalStorage(dataToSave);
});

document.getElementById('idealSave').addEventListener('click', function() {
  const idealData = [
    document.getElementById('idealSelfInput').value,
    document.getElementById('idealMoneyInput').value,
    document.getElementById('idealKnowledgeInput').value,
    document.getElementById('idealFamilyInput').value,
    document.getElementById('idealHobbyInput').value,
    document.getElementById('idealSocialInput').value,
    document.getElementById('idealWorkInput').value,
    document.getElementById('idealHealthInput').value
  ];

  chart.data.datasets[1].data = idealData.map(Number);
  chart.update();

  // データを保存する
  const dataToSave = {
    firstdata: chart.data.datasets[0].data,
    seconddata: idealData.map(Number)
  };

  saveDataToLocalStorage(dataToSave);
});

// データを保存する
function saveDataToLocalStorage(data) {
  localStorage.setItem('chartData', JSON.stringify(data));
}


// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', function() {
//localStorageからデータを取得してチャートを初期化
    loadDataFromLocalStorage();
  });
  
  // データをlocalStorageから取得してチャートを初期化する
  function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('chartData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      chart.data.datasets[0].data = parsedData.firstdata;
      chart.data.datasets[1].data = parsedData.seconddata;
      chart.update();
    }
  }

//   document.getElementById('realityReload').addEventListener('click', function() {
//     loadDataFromLocalStorage();
//   });
  
//   document.getElementById('idealReload').addEventListener('click', function() {
//     loadDataFromLocalStorage();
//   });
  
// memo section
// document.querySelector("#save").addEventListener("click", function() {
//   const key = document.querySelector("#key").value;
//   const value = document.querySelector("#memo").value;
//   localStorage.setItem(key, value);
//   const html = '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
//   document.querySelector("#list").insertAdjacentHTML('beforeend', html);
// });


// ページ読み込み時に保存されたデータを取得し、テーブルに書き出す
window.addEventListener('DOMContentLoaded', function() {
  // 保存されたデータのキーを全て取得
  const keys = Object.keys(localStorage);

  // 各キーに対応する値を取得し、指定した日付のデータのみテーブルに書き出す
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = localStorage.getItem(key);

    // 日付をチェックして指定した日付のデータのみテーブルに書き出す
    const date = new Date(key);
    if (isValidDate(date)) {
      const html = '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
      document.querySelector("#list").insertAdjacentHTML('beforeend', html);
    }
  }
});

// 保存ボタンがクリックされた時の処理
document.querySelector("#save").addEventListener("click", function() {
  const key = document.querySelector("#key").value;
  const value = document.querySelector("#memo").value;
  localStorage.setItem(key, value);

  // 日付をチェックして指定した日付のデータのみテーブルに書き出す
  const date = new Date(key);
  if (isValidDate(date)) {
    const html = '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
    document.querySelector("#list").insertAdjacentHTML('beforeend', html);
  }

  // 入力欄をクリアする
  document.querySelector("#key").value = '';
  document.querySelector("#memo").value = '';
});

// 日付の妥当性をチェックする関数
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// クリアボタン
document.querySelector("#clear").addEventListener("click", function() {
  // クリアボタンがクリックされた時の処理
  const keys = Object.keys(localStorage);

  // 各キーに対応する値を取得し、日付のキーを持つデータのみ削除する
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const date = new Date(key);
    if (isValidDate(date)) {
      localStorage.removeItem(key);
    }
  }

  // テーブルをクリアする
  document.querySelector("#list").innerHTML = '';
});

// 日付の妥当性をチェックする関数
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}




