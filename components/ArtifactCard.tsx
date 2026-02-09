/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import { Artifact } from '../types';

interface ArtifactCardProps {
    artifact: Artifact;
    isFocused: boolean;
    onClick: () => void;
}

const ArtifactCard = React.memo(({ 
    artifact, 
    isFocused, 
    onClick 
}: ArtifactCardProps) => {
    const codeRef = useRef<HTMLPreElement>(null);

    // Auto-scroll logic for this specific card
    useEffect(() => {
        if (codeRef.current) {
            codeRef.current.scrollTop = codeRef.current.scrollHeight;
        }
    }, [artifact.html]);

    const isGenerating = artifact.status === 'streaming';
    const isComplete = artifact.status === 'complete';

    return (
        <div 
            className={`artifact-card ${isFocused ? 'focused' : ''} ${isGenerating ? 'generating' : ''} ${isComplete ? 'complete' : ''}`}
            onClick={onClick}
        >
            <div className="artifact-header">
                <div>
                    <span className="status-dot"></span>
                    {artifact.styleName}
                </div>
                <div>{artifact.id.slice(-4)}</div>
            </div>
            <div className="artifact-card-inner">
                {isGenerating && (
                    <div className="generating-overlay">
                        <pre ref={codeRef} className="code-stream-preview">
                            {artifact.html}
                        </pre>
                    </div>
                )}
                <iframe 
                    srcDoc={artifact.html} 
                    title={artifact.id} 
                    sandbox="allow-scripts allow-forms allow-modals allow-popups allow-presentation allow-same-origin"
                    className="artifact-iframe"
                />
            </div>
        </div>
    );
});

export default ArtifactCard;