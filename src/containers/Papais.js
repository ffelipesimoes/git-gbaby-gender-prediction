import React from 'react'
import { images } from '../assets';
import { useTranslation } from "react-i18next";



const styles = {
   container: `py-[70px] space-y-4  flex flex-col justify-center bg-[#eefcf7]`,
   header: `font-[Kollektif] text-[35px] text-center px-[20px] leading-[50px]`,
   cardcontainer: `py-[25px] mx-auto md:max-w-[1800px] md:flex flex-row flex-wrap   max-w-screen justify-center `,
   green: `text-[#5BBAEB]`,
   fotocontainer: `flex flex-col md:flex-row max-w-[1000px] mx-auto align-middle items-center`,
   foto: `my-[20px] md:min-w-[400px]`,
   desc: ` p-[20px] align-middle font-[Kollektif] text-[25px] text-[gray] `,
}



const Papais = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container} id="PAIS">
          <div className={styles.header}>
            SOBRE OS <span className={styles.green}>PAPAIS</span>
          </div>

          <div className={styles.fotocontainer}>
            <div className={styles.foto} >
                <img className="relative top-0 left-0" src={images.papais} alt="Workplace" width="600" />
            </div>
            <div className={styles.desc} >
            A Rubia e o Felipe se conheceram na pandemia como muitos outros casais, descobrimos que o sonho de viajar era comum entre os 2. Era tanto que trocamos nossa festa de casamento por uma viagem na Europa, essa viagem foi tão boa que a cegonha nos encontrou e hoje temos uma entrega prevista para janeiro.   
            </div>
          </div>
      </div>
    </>
  )
}

export default Papais