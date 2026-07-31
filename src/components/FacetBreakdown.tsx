import type { DomainKey, FacetInfo, FacetScores } from '../lib/types'

interface FacetBreakdownProps {
  domain: DomainKey
  facetInfos: FacetInfo[]
  facetScores: FacetScores
}

function FacetBreakdown({ domain, facetInfos, facetScores }: FacetBreakdownProps) {
  const domainFacets = facetInfos
    .filter((info) => info.domain === domain)
    .sort((a, b) => a.facet - b.facet)

  return (
    <div className="facet-breakdown">
      {domainFacets.map((info) => {
        const key = `${info.domain}${info.facet}`
        const score = facetScores[key]
        if (!score) return null
        return (
          <div className="facet-row" key={key}>
            <div className="facet-row-header">
              <span className="facet-row-title">{info.title}</span>
              <span className="facet-row-result">{score.result}</span>
            </div>
            <div className="facet-row-track">
              <div className="facet-row-fill" style={{ width: `${score.normalized}%` }} />
            </div>
            <p className="facet-row-text">{info.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FacetBreakdown
