// fungsi tambahan
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 2,
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

  // nilai awal pembagian waris
  let hartaWaris = harta + piutang - hutang - pemakaman;
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
  <div class="row my-2" id="hitungan-waris">
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Anak Laki-Laki</h5>
      <p class="m-0">Jumlah : <span class="float-right">${anakLk} Orang</span></p>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisAnakLk * hartaWaris
      )}</span></p>
      <p class="m-0">Bagian Per Orang : <span class="float-right">${formatRupiah.format(
        (totalWarisAnakLk * hartaWaris) / anakLk
      )} / orang</span></p>
    </div>
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Anak Perempuan</h5>
      <p class="m-0">Jumlah : <span class="float-right">${anakPr} Orang</span></p>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisAnakPr * hartaWaris
      )}</span></p>
      <p class="m-0">Bagian Per Orang : <span class="float-right">${formatRupiah.format(
        (totalWarisAnakPr * hartaWaris) / anakPr
      )} / orang</span></p>
    </div>
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Abi / Ayah</h5>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisAbi * hartaWaris
      )}</span></p>
    </div>
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Umi / Ibu</h5>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisUmi * hartaWaris
      )}</span></p>
    </div>
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Saudara Laki-Laki</h5>
      <p class="m-0">Jumlah : <span class="float-right">${sodaraLk} Orang</span></p>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisSodaraLk * hartaWaris
      )}</span></p>
      <p class="m-0">Bagian Per Orang : <span class="float-right">${formatRupiah.format(
        (totalWarisSodaraLk * hartaWaris) / sodaraLk
      )} / orang</span></p>
    </div>
    <div class="col-6 my-2">
      <h5 class="text-center">Bagian untuk Saudara Perempuan</h5>
      <p class="m-0">Jumlah : <span class="float-right">${sodaraPr} Orang</span></p>
      <p class="m-0">Total bagian : <span class="float-right">${formatRupiah.format(
        totalWarisSodaraPr * hartaWaris
      )}</span></p>
      <p class="m-0">Bagian Per Orang : <span class="float-right">${formatRupiah.format(
        (totalWarisSodaraPr * hartaWaris) / sodaraPr
      )} / orang</span></p>
    </div>
    ${
      almarhum === "pr"
        ? `<div class="col-6 my-2">
          <h5 class="text-center">Bagian untuk Suami</h5>
          <p class="m-0">
            Total bagian :
            <span class="float-right">
              ${formatRupiah.format(totalWarisSuami * hartaWaris)}
            </span>
          </p>
        </div>`
        : `<div class="col-6 my-2">
          <h5 class="text-center">Bagian untuk Istri</h5>
          <p class="m-0">
            Jumlah : <span class="float-right">${istri} Orang</span>
          </p>
          <p class="m-0">
            Total bagian :
            <span class="float-right">
              ${formatRupiah.format(totalWarisIstri * hartaWaris)}
            </span>
          </p>
          <p class="m-0">
            Bagian Per Orang :
            <span class="float-right">
              ${formatRupiah.format((totalWarisIstri * hartaWaris) / istri)} /
              orang
            </span>
          </p>
        </div>`
    }
    <div class="col-6 my-2">
      <h5 class="text-center">Sisa Waris</h5>
      <p>Total Sisa : <span class="float-right">${formatRupiah.format(
        sisaWaris * hartaWaris
      )}</span></p>
    </div>
  </div>
  <p class="my-5 text-center">Catatan - perhitungan ini hanya sebagai ilustrasi perhitungan waris</p>`;
}
