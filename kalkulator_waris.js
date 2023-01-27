// fungsi tambahan
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 2
});

// fungsi utama
const kalkulator = document.getElementById("kalkulator");
kalkulator.addEventListener("submit", function (event) {
  event.preventDefault();
  HitungWaris();
});

function HitungWaris() {
  // ambil value dari form
  let almarhum = document.getElementById("almarhum").value;
  let harta = parseInt(document.getElementById("harta-waris").value);
  let wasiat = parseInt(document.getElementById("wasiat").value);
  let piutang = parseInt(document.getElementById("piutang").value) || 0;
  let hutang = parseInt(document.getElementById("hutang").value) || 0;
  let pemakaman = parseInt(document.getElementById("pemakaman").value) || 0;
  let anakLk = parseInt(document.getElementById("anak-lk").value) || 0;
  let anakPr = parseInt(document.getElementById("anak-pr").value) || 0;
  let suami = parseInt(document.getElementById("suami").value) || 0;
  let istri = parseInt(document.getElementById("istri").value) || 0;
  let abi = parseInt(document.getElementById("abi").value) || 0;
  let umi = parseInt(document.getElementById("umi").value) || 0;
  let sodaraLk = parseInt(document.getElementById("sodara-lk").value) || 0;
  let sodaraPr = parseInt(document.getElementById("sodara-pr").value) || 0;

  // reset value
  if (almarhum === "pr") {
    istri = 0;
  } else {
    suami = 0;
  }

  // nilai awal pembagian waris
  let hartaWaris = harta + piutang - hutang - pemakaman - wasiat;
  let bagianAnakLk = 0;
  let bagianAnakPr = 0;
  let bagianSuami = 0;
  let bagianIstri = 0;
  let bagianAbi = 0;
  let bagianUmi = 0;
  let bagianSodaraLk = 0;
  let bagianSodaraPr = 0;
  let sisaWaris = 0;

  // menghitung jumlah total penerima waris
  let totalPenerimaWaris =
    anakLk + anakPr + suami + istri + abi + umi + sodaraLk + sodaraPr;

  // menghitung bagian anak lk
  if (anakLk !== 0) {
    // kondisi ada anak lk
    bagianAnakLk = 1;
  } else {
    bagianAnakLk = 0;
  }

  // menghitung bagian anak pr
  if (anakLk !== 0) {
    // kondisi ada anak lk
    if (anakPr !== 0) {
      // kondisi ada anak pr
      bagianAnakPr = (1 / 2) * 1;
    } else {
      // kondisi default
      bagianAnakPr = 0;
    }
  } else {
    // kondisi anak lk tidak ada
    if (anakPr !== 0) {
      // kondisi ada anak pr
      if (anakPr === 1) {
        // kondisi anak pr hanya 1
        bagianAnakPr = (1 / 2) * 1;
      } else {
        // kondisi anak pr lebih dari 1
        bagianAnakPr = (2 / 3) * 1;
      }
    } else {
      // kondisi default
      bagianAnakPr = 0;
    }
  }

  // menghitung bagian suami
  if (suami !== 0) {
    if (anakLk + anakPr !== 0) {
      // kondisi ada anak
      bagianSuami = (1 / 4) * 1;
    } else {
      // kondisi tanpa anak
      bagianSuami = (1 / 2) * 1;
    }
  } else {
    // kondisi default
    bagianSuami = 0;
  }

  // menghitung bagian istri
  if (istri !== 0) {
    if (anakLk + anakPr !== 0) {
      // kondisi ada anak
      bagianIstri = (1 / 8) * 1;
    } else {
      // kondisi tanpa anak
      bagianIstri = (1 / 4) * 1;
    }
  } else {
    // kondisi default
    bagianIstri = 0;
  }

  // menghitung bagian umi
  if (umi !== 0) {
    // kondisi ada umi
    if (anakLk + anakPr !== 0 || sodaraLk + sodaraPr !== 0) {
      // kondisi ada anak almarhum atau ada saudara dari almarhum
      bagianUmi = (1 / 6) * 1;
    } else if (anakLk + anakPr === 0 && sodaraLk + sodaraPr === 0) {
      // kondisi tanpa anak almarhum atau tanpa saudara dari almarhum
      bagianUmi = (1 / 3) * 1;
    }
  } else {
    // kondisi default
    bagianUmi = 0;
  }

  // menghitung bagian abi
  if (abi !== 0) {
    // kondisi ada abi
    if (bagianUmi === (1 / 3) * 1) {
      // kondisi jika umi mendapatkan 1/3 bagian
      bagianAbi = (2 / 3) * 1;
    } else if (totalPenerimaWaris === 1 || sodaraLk > 0) {
      // kondisi jika merupakan pewaris tunggal
      bagianAbi = 1;
    } else {
      // kondisi default
      bagianAbi = (1 / 6) * 1;
    }
  } else {
    // kondisi default
    bagianAbi = 0;
  }

  // menghitung bagian saudara lk
  if (anakLk + anakPr === 0) {
    // kondisi jika almarhum tidak punya keturunan
    if (sodaraLk !== 0) {
      // kondisi ada saudara lk
      if (sodaraPr === 0) {
        if (anakLk + anakPr + abi === 0) {
          // kondisi jika saudara pr, anak lk, anak pr dan abi / ayah tidak ada
          if (totalPenerimaWaris === 1) {
            // jika penerima tunggal
            bagianSodaraLk = 1;
          } else {
            // jika bukan tunggal
            bagianSodaraLk = (1 / 6) * 1;
          }
        } else {
          // kondisi default
          bagianSodaraLk = 0;
        }
      } else {
        // kondisi ada saudara pr
        if (sodaraPr > 0) {
          if (abi === 1) {
            // kondisi ada abi / ayah
            bagianSodaraLk = 0;
          } else {
            // kondisi tidak ada abi / ayah
            bagianSodaraLk = 1;
          }
        } else {
          // kondisi default
          bagianSodaraLk = (1 / 6) * 1;
        }
      }
    } else {
      // kondisi default
      bagianSodaraLk = 0;
    }
  } else {
    // kondisi default
    bagianSodaraLk = 0;
  }

  // menghitung bagian sodara pr
  if (anakLk + anakPr === 0) {
    // kondisi jika almarhum tidak punya keturunan
    if (sodaraPr !== 0) {
      // kondisi ada saudara pr
      if (sodaraPr === 1) {
        // kondisi saudara pr hanya 1
        if (abi === 1) {
          // kondisi ada abi
          bagianSodaraPr = 0;
        } else {
          // kondisi tanpa abi
          bagianSodaraPr = 0.5;
        }
      } else {
        // kondisi saudara pr lebih dari 1
        if (sodaraLk === 0) {
          // kondisi tanpa saudara lk
          if (sodaraPr > 1) {
            // kondisi jika saudara pr lebih dari 1
            bagianSodaraPr = (2 / 3) * 1;
          } else {
            // kondisi default
            bagianSodaraPr = 0.5;
          }

        } else {
          // kondisi ada saudara lk
          if (sodaraLk !== 0) {
            // kondisi ada saudara lk
            bagianSodaraPr = 0.5;
          } else {
            // kondisi default
            bagianSodaraPr = (1 / 6) * 1;
          }
        }
      }
    } else {
      // kondisi default
      bagianSodaraPr = 0;
    }
  } else {
    // kondisi default
    bagianSodaraPr = 0;
  }

  // mencari penyebut / asal masalah
  let asalMasalah =
    anakLk * bagianAnakLk +
    anakPr * bagianAnakPr +
    suami * bagianSuami +
    istri * bagianIstri +
    abi * bagianAbi +
    umi * bagianUmi +
    sodaraLk * bagianSodaraLk +
    sodaraPr * bagianSodaraPr;

    console.log("bagian sodara pr :", bagianSodaraPr)
  // total bagian dari tiap ahli waris
  let totalWarisAnakLk = (bagianAnakLk * anakLk) / asalMasalah;
  let totalWarisAnakPr = (bagianAnakPr * anakPr) / asalMasalah;
  let totalWarisUmi = (bagianUmi * umi) / asalMasalah;
  let totalWarisAbi = (bagianAbi * abi) / asalMasalah;
  let totalWarisSuami = (bagianSuami * suami) / asalMasalah;
  let totalWarisIstri = (bagianIstri * istri) / asalMasalah;
  let totalWarisSodaraLk = (bagianSodaraLk * sodaraLk) / asalMasalah;
  let totalWarisSodaraPr = (bagianSodaraPr * sodaraPr) / asalMasalah;
  sisaWaris =
    1 -
    (totalWarisAnakLk +
      totalWarisAnakPr +
      totalWarisSuami +
      totalWarisIstri +
      totalWarisAbi +
      totalWarisUmi +
      totalWarisSodaraLk +
      totalWarisSodaraPr);

  // membuat render html
  const hasilHitungan = document.getElementById("hasil-hitungan");
  hasilHitungan.innerHTML = `
  <h1 class="text-center my-5">Hasil Perhitungan</h1>
  <div class="row my-2 d-flex justify-content-center" id="hitungan-awal">
    <div class="col-6">
      <h5 class="font-weight-normal">Almarhum : <span class="float-right">${
        almarhum === "pr" ? "Perempuan" : "Laki-Laki"
      }</span></h5>
      <h5 class="font-weight-normal">Harta Waris : <span class="float-right">${formatRupiah.format(
        harta
      )}</span></h5>
      <h5 class="font-weight-normal">Wasiat : <span class="float-right">${formatRupiah.format(
        wasiat
      )}</span></h5>
      <h5 class="font-weight-normal">Piutang : <span class="float-right">${formatRupiah.format(
        piutang
      )}</span></h5>
      <h5 class="font-weight-normal">Hutang : <span class="float-right">${formatRupiah.format(
        hutang
      )}</span></h5>
      <h5 class="font-weight-normal">Pengurusan Jenazah : <span class="float-right">${formatRupiah.format(
        pemakaman
      )}</span></h5>
      <h5>Harta Waris Pembagian : <span class="float-right">${formatRupiah.format(
        hartaWaris
      )}</span></h5>
    </div>
  </div>
  <h2 class="text-center my-5">Pembagian Waris</h2>
  <div class="row mx-5 my-2 id="hitungan-waris">
  <form class="cart-form w-100">
  <table class="cart-table w-100">
    <thead>
      <tr>
        <th>Ahli Waris</th>
        <th>Jumlah</th>
        <th>Bagian Per Orang</th>
        <th>Total Bagian</th>
      </tr>
    </thead>
    <tbody>
    ${
      bagianAnakLk !== 0
        ? ` <tr>
      <td class="product-name">
      Anak Laki-Laki
      </td>
      <td class="product-price"><span>${anakLk} Orang</span></td>
      <td class="product-quantity">
      ${formatRupiah.format((totalWarisAnakLk * hartaWaris) / anakLk)} / Orang
      </td>
      <td class="product-total-price">
        <span>  ${formatRupiah.format(totalWarisAnakLk * hartaWaris)}</span>
      </td>
    </tr>`
        : ""
    }
    ${
      bagianAnakPr !== 0
        ? ` <tr>
       <td class="product-name">
       Anak Perempuan
       </td>
       <td class="product-price"><span>${anakPr} Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format((totalWarisAnakPr * hartaWaris) / anakPr)} / Orang
       </td>
       <td class="product-total-price">
         <span> ${formatRupiah.format(totalWarisAnakPr * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianAbi !== 0
        ? ` <tr>
       <td class="product-name">
       Abi / Ayah
       </td>
       <td class="product-price"><span>1 Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format(totalWarisAbi * hartaWaris)} 
       </td>
       <td class="product-total-price">
         <span> ${formatRupiah.format(totalWarisAbi * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianUmi !== 0
        ? ` <tr>
       <td class="product-name">
       Umi / Ibu
       </td>
       <td class="product-price"><span>1 Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format(totalWarisUmi * hartaWaris)}
       </td>
       <td class="product-total-price">
         <span> ${formatRupiah.format(totalWarisUmi * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianSodaraLk !== 0
        ? ` <tr>
       <td class="product-name">
       Saudara Laki-Laki
       </td>
       <td class="product-price"><span>${sodaraLk} Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format(
         (totalWarisSodaraLk * hartaWaris) / sodaraLk
       )} / Orang
       </td>
       <td class="product-total-price">
         <span> ${formatRupiah.format(totalWarisSodaraLk * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianSodaraPr !== 0
        ? ` <tr>
       <td class="product-name">
       Saudara Perempuan
       </td>
       <td class="product-price"><span>${sodaraPr} Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format((totalWarisSodaraPr * hartaWaris) / sodaraPr)} 
       </td>
       <td class="product-total-price">
         <span> ${formatRupiah.format(totalWarisSodaraPr * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianSuami !== 0
        ? ` <tr>
       <td class="product-name">
      Suami
       </td>
       <td class="product-price"><span>1 Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format(totalWarisSuami * hartaWaris)}
       </td>
       <td class="product-total-price">
         <span>   ${formatRupiah.format(totalWarisSuami * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }
    ${
      bagianIstri !== 0
        ? ` <tr>
       <td class="product-name ">
      Istri
       </td>
       <td class="product-price"><span>${istri} Orang</span></td>
       <td class="product-quantity">
       ${formatRupiah.format((totalWarisIstri * hartaWaris) / istri)} / orang
       </td>
       <td class="product-total-price">
         <span>   ${formatRupiah.format(totalWarisIstri * hartaWaris)}</span>
       </td>
     </tr>`
        : ""
    }

       <td colspan="3" class="product-name">
      Total
       </td>
       <td ><span>${formatRupiah.format(
        hartaWaris
      )}</span></td>

    </tbody>
  </table>
</form>
  </div>
  <div class="d-flex justify-content-center form-group">
                <button onclick="unduhHitungan()" id="btn-unduh" class="btn btn-success col-3 thm-bg thm-btn">Unduh Hitungan</button>
              </div>
  <p class="my-5 text-center">Catatan - perhitungan ini hanya sebagai ilustrasi perhitungan waris</p>`;
}
