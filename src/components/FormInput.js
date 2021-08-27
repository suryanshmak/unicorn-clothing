import styled, {css} from "styled-components";

const FormInput = ({register, label, watch, type, name}) => {
    return (
        <FormGroup>
            <input className="form-input" type={type} {...register(name, {required: true})}/>
            <label className={`form-input-label ${watch(name) ? 'shrink' : ''}`}>{label}</label>
        </FormGroup>
    )
}

export default FormInput;

const shrinkLabel =  css`
    top: 1px;
    color: black;
    font-size: .7rem;
`;

const FormGroup = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    flex: 1;

    .form-input {
      font-family: 'Open Sans', sans-serif;
      font-size: 15px;
      width: 100%;
      padding: 18px 10px 10px 6px;
      border: 1px solid gray;

      &:focus ~ label {
        ${shrinkLabel}
      }
    }

    input[type='password'] {
      letter-spacing: 0.2em;
    }

    .form-input-label {
      color: gray;
      font-size: 16px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 6px;
      top: 13px;
      transition: 300ms ease all;

      &.shrink {
        ${shrinkLabel}
      }
    }
`