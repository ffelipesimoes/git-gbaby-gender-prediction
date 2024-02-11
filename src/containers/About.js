import React from 'react'
import { useTranslation } from "react-i18next";


const styles = {
   container: `space-y-4 flex flex-col justify-center pt-[70px] pb-[70px] `,
   about1: `font-[Kollektif]  text-[30px] text-center px-[20px]  leading-[50px]`,
   rev: `font-[Kollektif] text-[30px] text-[#5BBAEB]`,
   about2: ` font-[Kollektif] text-[25px] text-center px-[40px] max-w-[1500px] mx-auto text-[#7c8591] `,
}

const About = () => {
   const { t } = useTranslation();

   return (
      <>
         <div className={styles.container} id="SOBRE">
            <p className={styles.about1} >
               SOBRE A  <span className={styles.rev}> APOSTA </span>
            </p>
            <div className={styles.about2}>
               Fala galera, o mundo web3 está revolucionando até o mundo do descobrimento do sexo biológico dos bebês.<br /><br />
               Criamos um contrato inteligente(smartcontract) que irá receber o palpite do sexo biológico do bebê que está por vir.<br /><br />
               Funciona assim: Você faz sua aposta, quando sair o resultado e você tiver acertado, você poderá fazer o claim(resgate) do prêmio. Se sua ideia é ajudar financeiramente a chegada dessa criança, basta deixar o valor no contrato pois 15 dias após o resultado, o saldo do contrato será destinado aos papais. Caso o espírito apostador fale mais alto, uma contribuição de 30% nativa no contrato será destinada aos fazedores de menino.
               Esse contrato roda na rede Binance e pode ser verificado clicando <a href="https://bscscan.com/address/0x4dbe5cf47c1c7fac6cafaee7b6f99786a5d30f21" className="text-[blue]">aqui</a>
            </div>
         </div>
      </>
   )
}

export default About