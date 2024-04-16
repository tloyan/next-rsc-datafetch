import {Metadata} from 'next'
//import {terms} from '@/features/legal/terms'

export const metadata: Metadata = {
  title: "Condition d'utilisation",
  description: "Page de condition d'utilisation",
}
const Page = () => {
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-3xl font-bold">Conditions d&apos;Utilisation</h1>
      {terms.map((term, index) => {
        return <Term key={term.title} {...term} index={index + 1} />
      })}
    </div>
  )
}

type TermsProps = {
  title: string
  contents: string[]
  index: number
}
const Term = (props: TermsProps) => {
  const {title, contents, index} = props
  const termsContent = contents.map((content, cIndex) => {
    return (
      <li className="p-1" key={cIndex}>
        <span className="">
          {index}.{cIndex + 1}.
        </span>{' '}
        {content}
      </li>
    )
  })
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">
        <span>{index}.</span> {title}
      </h2>
      <ul className="text-muted-foreground pl-3">{termsContent}</ul>
    </div>
  )
}

export default Page

type termsItem = {
  title: string
  contents: string[]
}

const terms: termsItem[] = [
  {
    title: 'Introduction',
    contents: [
      "En utilisant ce service, vous acceptez les précautions d'utilisation. Veuillez les lire attentivement avant d'accéder ou d'utiliser le service.",
      'Ce service est conçu pour aider les entrepreneurs à gérer leurs finances et leur activité sportive. Son utilisation est soumise aux conditions énoncées ci-dessous.',
    ],
  },
  {
    title: 'Acceptation des Conditions',
    contents: [
      "En accédant ou en utilisant ce service, vous acceptez d'être lié par ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.",
      'Nous nous réservons le droit de modifier ces conditions à tout moment. Tout changement sera publié sur cette page. Votre utilisation continue du service après de telles modifications constitue votre acceptation desdites modifications.',
    ],
  },
  {
    title: 'Utilisation du Service',
    contents: [
      'Vous êtes responsable de maintenir la confidentialité de vos informations de connexion.',
      'Vous acceptez de ne pas utiliser le service à des fins illégales ou non autorisées.',
      'Vous acceptez de ne pas accéder au code source du service ou de le modifier de quelque manière que ce soit.',
      "Vous acceptez de ne pas utiliser le service pour toute activité qui pourrait nuire à la sécurité ou à l'intégrité du service ou de tout autre système informatique.",
    ],
  },
  {
    title: 'Données Utilisateur',
    contents: [
      'Vous conservez la propriété de toutes les données que vous entrez ou téléchargez dans le service.',
      'Nous ne revendiquerons aucun droit de propriété sur vos données.',
      "Vous consentez à ce que nous utilisions vos données pour fournir et améliorer le service, ainsi qu'à des fins d'analyse et de marketing.",
    ],
  },
  {
    title: 'Limitation de Responsabilité',
    contents: [
      "Nous ne serons pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs découlant de l'utilisation ou de l'incapacité à utiliser le service.",
      "Nous ne garantissons pas que le service sera exempt d'erreurs ou de interruptions.",
    ],
  },
  {
    title: 'Droit Applicable',
    contents: [
      'Les présentes conditions sont régies par les lois en vigueur dans votre pays de résidence.',
      'Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux compétents de votre pays de résidence.',
    ],
  },
]
