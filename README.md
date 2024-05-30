# Koodiklinikka

![Travis](https://travis-ci.org/koodiklinikka/koodiklinikka.fi.svg?branch=master)

<img align="right" src="./logo-new-black.svg" alt="Koodiklinikka-logo" max-width="30%">

**Koodiklinikka.fi lähdekoodi**. [Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) ja [Pull Requestejä](https://github.com/koodiklinikka/koodiklinikka.fi/pulls) otetaan lämpimästi vastaan. Yritämme pitää kynnyksen kontribuoida projektiin alhaisena, jotta mahdollisimman moni pääsisi jättämään siihen jälkensä. Kaikki koodi katselmoidaan läpi ja mergetään projektiin kun näyttää hyvälle. Muutamasta mergetystä Pull Requestista oikeudet ylläpitää projektia.

[Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) voidaan käyttää myös sivun:

- toiminnallisuuteen
- designiin
- [HTTP-rajapintaan](https://github.com/koodiklinikka/koodiklinikka.fi-api)
- projektin hallintaan liittyviin asioihin
- tai koko Koodiklinikkaan yleisesti.

---

## Projektin asennus

### Vaaditut työkalut

- Asenna [Node.js](http://nodejs.org) ja [Yarn 1.x](https://classic.yarnpkg.com/en/) (tai [Bun](https://bun.sh/))
- Asenna [Git](https://git-scm.com/) client lähdekoodin hallintaan

### Kloonaa projekti koneellesi

```sh
git clone https://github.com/koodiklinikka/koodiklinikka.fi.git
```

### Käynnistä kehitystila

```sh
cd koodiklinikka.fi
yarn
yarn start
```

### Avaa esikatselu selaimessa

Avaa selaimessasi: [`http://localhost:3000`](http://localhost:3000)

## Komennot

### `yarn` (tai `bun i`)

Asentaa projektin riippuvuudet

### `yarn dev` (tai `bun dev`)

Palvelee sovellusta kehitystilassa porttiin `3000`

### `yarn build` (tai `bun run build`)

Kääntää lähdetiedostot -> `out/` -hakemistoon
