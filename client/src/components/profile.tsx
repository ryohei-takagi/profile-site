import * as React from 'react'
import styled from 'styled-components'
import {pc, sp, tab} from '../styles/responsive'
import Profile_1 from '../images/profile.png'
import TwitterIcon from '../images/icons/twitter.png'
import ZennIcon from '../images/icons/zenn.png'
import GithubIcon from '../images/icons/github.png'
import AWSCloudPractitionerBadge from '../images/badge/aws-certified-cloud-practitioner.png'
import AWSSolutionArchitectAssociateBadge from '../images/badge/aws-certified-solutions-architect-associate.png'
import AWSDeveloperAssociateBadge from '../images/badge/aws-certified-developer-associate.png'
import AWSSysOpsAdministratorAssociateBadge from '../images/badge/aws-certified-sysops-administrator-associate.png'
import AWSSolutionArchitectProfessionalBadge from '../images/badge/aws-certified-solutions-architect-professional.png'
import AWSDevOpsEngineerProfessionalBadge from '../images/badge/aws-certified-devops-engineer-professional.png'
import {useEffect, useState} from 'react'

const Wrap = styled.section<{ height: number }>`
  position: relative;
  width: 100%;
  
  ${pc`
    height: ${({height}) => height}px;
    min-height: 640px;
  `}
`

const H3 = styled.h3`
  font-weight: bold;
  padding-top: 100px;
  
  ${sp`
    font-size: 5em;
    text-align: center;
  `}
  ${tab`
    font-size: 6em;
    text-align: center;
  `}
  ${pc`
    font-size: 6em;
    padding-left: 150px;
  `}
`

const Name = styled.div`
  margin-top: 50px;

  ${sp`
    text-align: center;
  `}
  ${tab`
    margin-left: 130px;
  `}
  ${pc`
    padding-left: 150px;
  `}
`

const NameEnglish = styled.div`
  display: inline;
  font-size: 3em;
`

const ThirdPartyUl = styled.ul`
  ${sp`
    text-align: right;
    margin: 15px 50px 0 0;
  `}
  ${tab`
    display: inline;
    margin-left: 15px;
    vertical-align: bottom;
  `}
  ${pc`
    display: inline;
    margin-left: 15px;
    vertical-align: bottom;
  `}
`

const ThirdPartyLi = styled.li`
  display: inline-block;
  margin-left: 5px;
`

const ThirdPartyIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer
`

const thirdPartyData = [
  { "key": "twitter", "image": TwitterIcon, "link": "https://twitter.com/_nyoston" },
  { "key": "zenn", "image": ZennIcon, "link": "https://zenn.dev/ryohei_takagi" },
  { "key": "github", "image": GithubIcon, "link": "https://github.com/ryohei-takagi" },
]

const ImageUl = styled.ul<{ width: number }>`
  margin-top: 25px;
  
  ${sp`
    text-align: center;
  `}
  ${tab`
    text-align: center;
  `}
  ${pc`
    position: absolute;
    left: ${({width}) => width / 2  + 250}px;
  `}
`

const ImageLi = styled.li`
  display: inline-block;
  
  ${sp`
    margin: 0 5px;
  `}
  ${tab`
    margin: 0 15px;
  `}
  ${pc`
    margin: 0 15px;
  `}
`

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`

const Detail = styled.section<{ width: number }>`
  background-color: #FFFFFF;
  border-radius: 15px;
  
  ${sp`
    margin: 25px 45px 0 45px;
  `}
  ${tab`
    margin: 25px 125px 0 125px;
  `}
  ${pc`
    margin: 50px 0 0 150px;
    max-width: ${({width}) => width / 10 * 4}px;
  `}
`

const DetailTitle = styled.div`
  font-size: 2.25em;
  padding: 25px 35px 0 35px;
`

const DetailBody = styled.div`
  font-size: 1.5em;
  padding: 25px 35px 25px 35px;
`

const HobbyTitle = DetailTitle

const HobbyBody = styled.div`
  font-size: 1.5em;
  padding: 15px 35px 25px 35px;
`

const P = styled.p`
  margin: 5px 0;
  line-height: 1.4em;
`

const AWSBadgeUl = styled.ul<{ width: number }>`
  ${sp`
    text-align: center;
    margin: 25px 45px 0 45px;
  `}
  ${tab`
    margin: 25px 125px 0 125px;
  `}
  ${pc`
    position: absolute;
    left: ${({width}) => width / 2  + 125}px;
    top: 450px;
  `}
`

const AWSBadgeLi = styled.li`
  display: inline-block;
`

const AWSBadge = styled.img`
  width: 120px;
  height: 120px;
  cursor: pointer;
`

const awsBadgeData = [
  { "key": "sap", "image": AWSSolutionArchitectProfessionalBadge, "link": "https://www.credly.com/badges/79f67bfd-a5f7-4c0d-901e-d8054f6acef9/public_url" },
  { "key": "dop", "image": AWSDevOpsEngineerProfessionalBadge, "link": "https://www.credly.com/badges/448cbb88-2393-4773-a09f-caa5b03c4dc9/public_url" },
  { "key": "saa", "image": AWSSolutionArchitectAssociateBadge, "link": "https://www.credly.com/badges/6a676cb0-4758-4423-a053-c3a120bcc51c/public_url" },
  { "key": "dva", "image": AWSDeveloperAssociateBadge, "link": "https://www.credly.com/badges/f2d29b8a-f1a0-49b4-b85b-8ee0bea1d4a2/public_url" },
  { "key": "soa", "image": AWSSysOpsAdministratorAssociateBadge, "link": "https://www.credly.com/badges/8a1f632e-a61b-434c-b428-f03e0e8ea77b/public_url" },
  { "key": "clf", "image": AWSCloudPractitionerBadge, "link": "https://www.credly.com/badges/1c76d98e-c5dc-45f7-865f-2d08fa872fbb/public_url" },
]

const Profile = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [rendered, setRendered] = useState<boolean>(false)

  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
    setHeight(document.documentElement.clientHeight)
    setRendered(true)

    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth)
      setHeight(document.documentElement.clientHeight)
    })

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  return (
    rendered ?
      <Wrap height={height} id="profile">
        <H3>PROFILE</H3>
        <Name>
          <NameEnglish>Ryohei Takagi</NameEnglish>
          <ThirdPartyUl>
            {thirdPartyData.map(v => {
              return <ThirdPartyLi key={v.key}><ThirdPartyIcon src={v.image} onClick={() => window.open(v.link)}/></ThirdPartyLi>
            })}
          </ThirdPartyUl>
        </Name>
        <ImageUl width={width}>
          <ImageLi><Image src={Profile_1}/></ImageLi>
        </ImageUl>
        <Detail width={width}>
          <DetailTitle>DevOpsエンジニア・アーキテクト</DetailTitle>
          <DetailBody>
            <P>1991年生まれ</P>
            <P>2014年から2018年まで中小IT企業でSI業務に従事</P>
            <P>2018年から2020年までフリーランスSEを経験</P>
            <P>現在までWeb3系スタートアップでリードアーキテクトとして参画中</P>
          </DetailBody>
        </Detail>
        <Detail width={width}>
          <HobbyTitle>趣味</HobbyTitle>
          <HobbyBody>
            <P>・競技麻雀</P>
            <P>・ライブ観戦</P>
          </HobbyBody>
        </Detail>
        <AWSBadgeUl width={width}>
          {awsBadgeData.map(v => {
            return <AWSBadgeLi key={v.key}><AWSBadge src={v.image} onClick={() => window.open(v.link)}/></AWSBadgeLi>
          })}
        </AWSBadgeUl>
      </Wrap> :
      <></>
  )
}

export default Profile
