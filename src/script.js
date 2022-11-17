document.addEventListener("DOMContentLoaded",()=>{
  const RootEl = document.querySelector('.globalWrapper');
  const inputs = RootEl.querySelectorAll('label input');
  const tableEl = RootEl.querySelector('table');
  tableEl.insertAdjacentHTML('afterend', `<button id="resetBtn" type="button" style="display:none;">再度検索しなおす</button>`);
  
  
  
  // 【関数】検索機能の実行
  const SearchAct = () => {
    const flagments = []; // 検索用語句（配列）の用意
    inputs.forEach(input => {
      flagments.push(input.value); // 入力値を上記の配列に格納
    });
    // console.log(flagments);
    wordsSelection(flagments); // 【関数】table内の項目と合致する内容を取得
  }
  
  
  // 【関数】検索用語句の 「個数（配列数）」 を条件分岐（クエリフラグ）にして、table内の項目と合致する内容を filter で取得
  const wordsSelection = (targets) => {
    const tableEls = RootEl.querySelector('table');
    const tableChildren = tableEls.querySelectorAll('tr');
    
    // querySelectorAll(elements)は NodeList なので、Array.from()で配列に変換する必要がある
    const fliters = Array.from(tableChildren).filter(tChild => {
      // 項目数に応じて増減（現状「4」項目）
      return (
        tChild.textContent.match(targets[0]) &&
        tChild.textContent.match(targets[1]) &&
        tChild.textContent.match(targets[2]) &&
        tChild.textContent.match(targets[3])
      );
    });
    
    // 【関数】（検索語句とtable内の項目とで）合致した要素に対して行う処理
    if(fliters.length > 0){
      filtersAction(fliters);
    } else {
      alert('該当項目がありません。\n再度、別の内容で検索してみてください。');
    }
  }
  
  
  // 【関数】（検索語句とtable内の項目とで）合致した要素に対して行う処理
  const backToOrigin = tableEl.innerHTML; // tableタグの初期内容を確保（あとで初期表示に戻すため）
  const filtersAction = (target) => {
    tableEl.querySelectorAll('tr').forEach((tr, tri) => {
      if(tri !== 0){ // 商品名など見出し用の<tr>以外はすべて削除（空にする）
        tr.remove();
      }
    });
    // （商品名など見出し用の）<tr>（tr:first-of-type）以下にfilterで取得した内容・項目を追加
    target.forEach(filterEl => {
      tableEl.querySelector('tr:first-of-type').insertAdjacentHTML('afterend', `<tr>${filterEl.innerHTML}</tr>`);
    });
    
    // リセットボタン関連の処理
    const resetBtn = RootEl.querySelector('#resetBtn');
    resetBtn.style.setProperty('display', 'block');
    resetBtn.addEventListener('click',()=>{
      tableEl.innerHTML = backToOrigin; // 初期表示に戻す
      actionBtn.setAttribute('disabled', true); // 初期化（disabled属性をセット）
      resetBtn.style.setProperty('display', 'none'); // リセットボタンの非表示
      
      inputs.forEach(input => {
        input.value = ""; // 全input要素をリセット
      });
    });
    
    // console.log(target.innerHTML.trim());
  }
  
  
  // クリックイベントで上記関数の実行
  const actionBtn = RootEl.querySelector('.btnWrap button');
  actionBtn.setAttribute('disabled', true); // 初期化（disabled属性をセット）
  actionBtn.addEventListener('click', ()=>{
    // 入力されていて、入力値が数値 (符号あり小数 (- のみ許容)) であることをチェック
    const priceName = RootEl.querySelector('label input[name="price"]').value;
    if(priceName.length > 0 && !(priceName.match(/^[-]?([1-9]\d*|0)(\.\d+)?$/))){
      alert('数値で入力してください');
    } else {
      SearchAct(); // 【関数】検索機能の実行
    }
  });
  
  
  // 入力値（全てのinputタグ）が空の場合は検索ボタンを使用不可に
  const btnControlFunc = (Arytarget, actTarget) => {
    let bool = Array.from(Arytarget).every((input)=>{
        return input.value.length === 0; // 全てのinputタグが空かどうか判定
    });
    if(bool){
      actTarget.setAttribute('disabled', true);
    }　else {
      actTarget.removeAttribute('disabled');
    }
  }
  // inputの入力の度に処理を実行
  inputs.forEach(input => {
    input.addEventListener('input', ()=>{
      btnControlFunc(inputs, actionBtn);
    });
  });
  
});