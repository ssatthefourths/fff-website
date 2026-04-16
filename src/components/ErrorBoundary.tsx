import { Component, type ReactNode } from 'react';
import { Link } from 'react-router';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#f4eefa] min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[60px] mb-4">Oops!</p>
            <p className="font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[20px] mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
              Something went wrong. Don't worry — your cart is saved!
            </p>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="inline-block bg-[#bbd148] text-[#3f3f3f] font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[2.7px] uppercase px-[40px] py-[20px] rounded-[100px] hover:brightness-110 transition-all"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
