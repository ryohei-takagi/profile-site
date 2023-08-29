import * as React from 'react'
import styled from 'styled-components'
import {pc, sp, tab} from '../styles/responsive'
import Rating from '@mui/material/Rating'
import Fargate from '../images/icons/fargate.png'
import Datadog from '../images/icons/datadog.png'
import Terraform from '../images/icons/terraform.png'
import GoIcon from '../images/icons/go.png'
import Typescript from '../images/icons/typescript.png'
import PHP from '../images/icons/php.png'
import Scala from '../images/icons/scala.png'
import {useEffect, useState} from 'react'

const Wrap = styled.section`
  position: relative;
  width: 100%;
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

const Ul = styled.ul`
  ${sp`
    margin: 25px 45px 0 45px;
  `}
  ${tab`
    margin: 25px 125px 0 125px;
  `}
  ${pc`
    margin: 50px 0 0 150px;
  `}
`

const Li = styled.li<{ width: number }>`
  margin-bottom: 20px;
  
  ${sp`
    display: block;
  `}
  ${tab`
    display: block;
  `}
  ${pc`
    display: inline-flex;
    width: ${({width}) => width / 10 * 4}px;
    max-width: 480px;
    margin-right: 20px;
  `}
`

const Detail = styled.section<{ width: number }>`
  background-color: #FFFFFF;
  border-radius: 15px;
  
  ${pc`
    width: ${({width}) => width / 10 * 4}px;
    max-width: 480px;
    height: 260px;
  `}
`

const DetailTitle = styled.div`
  padding: 25px 0 0 25px;
  
  ${sp`
    font-size: 1.75em;
  `}
  ${tab`
    font-size: 2em;
  `}
  ${pc`
    font-size: 2em;
  `}
`

const DetailBody = styled.div`
  padding: 25px 35px 25px 35px;

  ${sp`
    font-size: 1.4em;
  `}
  ${tab`
    font-size: 1.5em;
  `}
  ${pc`
    font-size: 1.5em;
  `}
`

const Icon = styled.img`
  display: inline;
  width: 35px;
  height: 35px;
  object-fit: contain;
  vertical-align: middle;
`

const NoIcon = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  vertical-align: middle;
`

const Name = styled.span`
  vertical-align: middle;
  margin-left: 15px;
`

const Star = styled(Rating)`
  vertical-align: middle;
  margin-left: 15px;
`

const BodySection = styled.ul`
  padding: 0 10px;
`

const Sentence = styled.li`
  margin: 10px 0;
  line-height: 1.4em;
  list-style: disc;
`

const A = styled.a`
  color: #00608D;
  text-decoration: none;
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const sections = [
  { "image": Fargate, "name": "Cloud Architecting", "rating": 5, "body":
    <BodySection>
      <Sentence>AWS Solution Architect Professional & DevOps Engineer Professional</Sentence>
      <Sentence>コンテナオーケストレーション、CI/CD、DataLake、ETL・分析基盤</Sentence>
      <Sentence>サーバーレスソリューションの提案</Sentence>
    </BodySection>
  },
  { "image": Datadog, "name": "Observability Tool", "rating": 5, "body":
    <BodySection>
      <Sentence>Datadog等SaaS系オブザーバビリティツールを活用したSREの推進</Sentence>
      <Sentence>SLOの提案</Sentence>
    </BodySection>
  },
  { "image": Terraform, "name": "IaC", "rating": 5, "body":
    <BodySection>
      <Sentence>Terraform等IaC(Infrastructure as Code)の推進</Sentence>
      <Sentence>クラウド・SaaSリソースのコード化</Sentence>
    </BodySection>
  },
  { "image": GoIcon, "name": "Go", "rating": 5, "body":
    <BodySection>
      <Sentence>Webサービスやバッチ、CLI等の設計および実装</Sentence>
      <Sentence>gRPC、Gin、Echo</Sentence>
    </BodySection>
  },
  { "image": Typescript, "name": "Typescript", "rating": 5, "body":
    <BodySection>
      <Sentence>Webサービスやバッチ、CLI等の設計および実装</Sentence>
      <Sentence>Next.js、React、Vue、Deno、Fresh</Sentence>
    </BodySection>
  },
  { "image": PHP, "name": "PHP", "rating": 5, "body":
    <BodySection>
      <Sentence>Webサービスやバッチ、CLI等の設計および実装</Sentence>
      <Sentence>Laravel、Ethna、ZendFramework、CakePHP</Sentence>
    </BodySection>
  },
  { "image": Scala, "name": "Scala", "rating": 4, "body":
    <BodySection>
      <Sentence>Webサービスやバッチ、CLI等の設計および実装</Sentence>
      <Sentence>PlayFramework</Sentence>
    </BodySection>
  },
]

const Skill = () => {
  const [width, setWidth] = useState<number>(0)
  const [rendered, setRendered] = useState<boolean>(false)

  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
    setRendered(true)

    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth)
    })

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  return (
    rendered ?
      <Wrap id="skill">
        <H3>SKILL</H3>
        <Ul>
          {sections.map(v => {
            return (
              <Li width={width} key={v.name}>
                <Detail width={width}>
                  <DetailTitle>
                    {v.image ? <Icon src={v.image}/> : <NoIcon/>}
                    <Name>{v.name}</Name>
                    <Star name="read-only" value={v.rating} size="small" readOnly />
                  </DetailTitle>
                  <DetailBody>
                    {v.body}
                  </DetailBody>
                </Detail>
              </Li>
            )
          })}
        </Ul>
      </Wrap> :
      <></>
  )
}

export default Skill
