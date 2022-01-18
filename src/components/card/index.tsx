import "./card.scss"

interface CardProps {
  data: {
    name: string;
    nutritions: {
      calories: number;
      fat: number;
      carbohydrates: number;
      protein: number;
      sugar: number;
    }
  }
  onAdd: (data: any) => void;
}

export function Card({ data, onAdd }: CardProps) {
  return(
    <div className="card">
      <div className="card-header">
        <p>{data.name}</p>
      </div>
      <div className="card-body">
        <ul>
          <li>Carbohydrates: {data.nutritions.carbohydrates}</li>
          <li>Protein: {data.nutritions.protein}</li>
          <li>Sugar: {data.nutritions.sugar}</li>
          <li>Fat: {data.nutritions.fat}</li>
          <li>Calories: {data.nutritions.calories}</li>
        </ul>
      </div>
      <div className="card-footer">
        <button onClick={() => onAdd(data)}>Comprar</button>
      </div>
    </div>
  )
}