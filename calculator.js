// input disini
let hartaWaris = 30;
let anakLk = 2;
let anakPr = 2;
let suami = 0;
let istri = 2;
let abi = 1;
let umi = 1;
let sodaraLk = 1;
let sodaraPr = 1;

function HitungWaris() {
  // nilai awal pembagian waris
  let bagianAnakLk = 0;
  let bagianAnakPr = 0;
  let bagianSuami = 0;
  let bagianIstri = 0;
  let bagianAbi = 0;
  let bagianUmi = 0;
  let bagianSodaraLk = 0;
  let bagianSodaraPr = 0;
  let sisaWaris = 0;

  let totalPenerimaWaris =
    anakLk + anakPr + suami + istri + abi + umi + sodaraLk + sodaraPr;

  // menghitung bagian anak lk
  if (anakLk !== 0) {
    bagianAnakLk = 1;
  } else {
    bagianAnakLk = 0;
  }

  // menghitung bagian anak pr
  if (anakLk !== 0) {
    if (anakPr !== 0) {
      bagianAnakPr = (1 / 2) * 1;
    } else {
      bagianAnakPr = 0;
    }
  } else {
    if (anakPr !== 0) {
      if (anakPr === 1) {
        bagianAnakPr = (1 / 2) * 1;
      } else {
        bagianAnakPr = (2 / 3) * 1;
      }
    } else {
      bagianAnakPr = 0;
    }
  }

  // menghitung bagian suami
  if (suami !== 0) {
    if (anakLk + anakPr !== 0) {
      bagianSuami = (1 / 4) * 1;
    } else {
      bagianSuami = (1 / 2) * 1;
    }
  } else {
    bagianSuami = 0;
  }

  // menghitung bagian istri
  if (istri !== 0) {
    if (anakLk + anakPr !== 0) {
      bagianIstri = (1 / 8) * 1;
    } else {
      bagianIstri = (1 / 4) * 1;
    }
  } else {
    bagianIstri = 0;
  }

  // menghitung bagian umi
  if (umi !== 0) {
    if (anakLk + anakPr !== 0 || sodaraLk + sodaraPr !== 0) {
      bagianUmi = (1 / 6) * 1;
    } else if (anakLk + anakPr === 0 && sodaraLk + sodaraPr === 0) {
      bagianUmi = (1 / 3) * 1;
    }
  } else {
    bagianUmi = 0;
  }

  // menghitung bagian abi
  if (abi !== 0) {
    if (bagianUmi === (1 / 3) * 1) {
      bagianAbi = (2 / 3) * 1;
    } else if (totalPenerimaWaris === 1 || sodaraLk > 0) {
      bagianAbi = 1;
    } else {
      bagianAbi = (1 / 6) * 1;
    }
  } else {
    bagianAbi = 0;
  }

  // menghitung bagian sodara lk
  if (anakLk + anakPr === 0) {
    if (sodaraLk !== 0) {
      if (sodaraPr === 0) {
        if (anakLk + anakPr + abi === 0) {
          if (totalPenerimaWaris === 1) {
            bagianSodaraLk = 1;
          } else {
            bagianSodaraLk = (1 / 6) * 1;
          }
        } else {
          bagianSodaraLk = 0;
        }
      } else {
        if (sodaraPr > 0) {
          if (abi === 1) {
            bagianSodaraLk = 0;
          } else {
            bagianSodaraLk = 1;
          }
        } else {
          bagianSodaraLk = (1 / 6) * 1;
        }
      }
    } else {
      bagianSodaraLk = 0;
    }
  } else {
    bagianSodaraLk = 0;
  }

  // menghitung bagian sodara pr
  if (anakLk + anakPr === 0) {
    if (sodaraPr !== 0) {
      if (sodaraPr === 1) {
        if (abi === 1) {
          bagianSodaraPr = 0;
        } else {
          bagianSodaraPr = 0.5;
        }
      } else {
        if (sodaraLk === 0) {
          if (sodaraPr > 1) {
            bagianSodaraPr = (2 / 3) * 1;
          } else {
            bagianSodaraPr = 0.5;
          }
        } else {
          if (sodaraLk !== 0) {
            bagianSodaraPr = 0.5;
          } else {
            bagianSodaraPr = (1 / 6) * 1;
          }
        }
      }
    } else {
      bagianSodaraPr = 0;
    }
  } else {
    bagianSodaraPr = 0;
  }

  let asalMasalah =
    anakLk * bagianAnakLk +
    anakPr * bagianAnakPr +
    suami * bagianSuami +
    istri * bagianIstri +
    abi * bagianAbi +
    umi * bagianUmi +
    sodaraLk * bagianSodaraLk +
    sodaraPr * bagianSodaraPr;

  console.log("asalMasalah " + asalMasalah.toFixed(3));
  console.log(
    "bagian anak lk " +
      (((bagianAnakLk * anakLk) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian anak pr " +
      (((bagianAnakPr * anakPr) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian suami " +
      (((bagianSuami * suami) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian istri " +
      (((bagianIstri * istri) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian abi " + (((bagianAbi * abi) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian umi " + (((bagianUmi * umi) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian sodara lk " +
      (((bagianSodaraLk * sodaraLk) / asalMasalah) * hartaWaris).toFixed(3)
  );
  console.log(
    "bagian sodara pr " +
      (((bagianSodaraPr * sodaraPr) / asalMasalah) * hartaWaris).toFixed(3)
  );
}

HitungWaris();
